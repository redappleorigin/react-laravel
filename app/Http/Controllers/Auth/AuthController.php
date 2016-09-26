<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use Validator;
use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\ThrottlesLogins;
use Illuminate\Foundation\Auth\AuthenticatesAndRegistersUsers;
use App\Http\Request;

use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Registration & Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users, as well as the
    | authentication of existing users. By default, this controller uses
    | a simple trait to add these behaviors. Why don't you explore it?
    |
    */

    use AuthenticatesAndRegistersUsers, ThrottlesLogins;

    /**
     * Where to redirect users after login / registration.
     *
     * @var string
     */
    protected $redirectTo = '/dashboard';

    protected $loginView = 'app';

    protected $registerView = 'app';

    /**
     * Create a new authentication controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware(
            $this->guestMiddleware(),
            ['except' => 'logout']
        );
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'name' => 'required|max:255',
            'email' => 'required|email|max:255|unique:users',
            'password' => 'required|min:6|confirmed',
        ]);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return User
     */
    protected function create(array $data)
    {
        return User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
        ]);
    }

    /**
     * Send the response after the user was authenticated.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  bool  $throttles
     * @return \Illuminate\Http\Response
     */
    protected function handleUserWasAuthenticated(Request $request, $throttles)
    {
        if ($throttles)
        {
            $this->clearLoginAttempts($request);
        }

        if (method_exists($this, 'authenticated'))
        {
            return $this->authenticated($request, Auth::guard($this->getGuard())->user());
        }

        if ($request->ajax() || $request->wantsJson())
        {
            $auth = [
                'guest' => Auth::guest(),
                'user' => [
                    'name' => Auth::user()->name ?? null,
                ],
            ];

            return response($auth, 200);
        }

        return redirect()->intended($this->redirectPath());
    }

    /**
     * Redirect the user after determining they are locked out.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    protected function sendLockoutResponse(Request $request)
    {
        $seconds = $this->secondsRemainingOnLockout($request);

        if ($request->ajax() || $request->wantsJson())
        {
            $auth = [
                $this->loginUsername() => $this->getLockoutErrorMessage($seconds),
            ];

            return response($auth, 429);
        }

        return redirect()->back()
            ->withInput($request->only($this->loginUsername(), 'remember'))
            ->withErrors([
                $this->loginUsername() => $this->getLockoutErrorMessage($seconds),
            ]);
    }

    /**
     * Get the failed login response instance.
     *
     * @param \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    protected function sendFailedLoginResponse(Request $request)
    {
        if ($request->ajax() || $request->wantsJson())
        {
            $errors = [
                $this->loginUsername() => $this->getFailedLoginMessage(),
            ];

            return response($errors, 401);
        }

        return parent::sendFailedLoginResponse();
    }

    /**
     * Log the user out of the application.
     *
     * @return \Illuminate\Http\Response
     */
    public function logout(Request $request)
    {
        Auth::guard($this->getGuard())->logout();

        if ($request->ajax() || $request->wantsJson())
        {
            $auth = [
                'guest' => Auth::guest(),
                'user' => null,
            ];

            return response($auth, 200);
        }

        return redirect(property_exists($this, 'redirectAfterLogout') ? $this->redirectAfterLogout : '/');
    }

    /**
     * Handle a registration request for the application.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function register(Request $request)
    {
        $validator = $this->validator($request->all());

        if ($validator->fails()) {
            $this->throwValidationException(
                $request, $validator
            );
        }

        Auth::guard($this->getGuard())->login($this->create($request->all()));

        if ($request->ajax() || $request->wantsJson())
        {
            $auth = [
                'guest' => Auth::guest(),
                'user' => [
                    'name' => Auth::user()->name ?? null,
                ],
            ];

            return response($auth, 201);
        }

        return redirect($this->redirectPath());
    }
}
