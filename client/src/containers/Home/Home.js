import React from 'react';

import { Container } from '../../components/Layout';

const Home = () => (
    <Container id="Home">
        <div class="row">
            <div class="col-md-10 col-md-offset-1">
                <div class="panel panel-default">
                    <div class="panel-heading">Welcome</div>

                    <div class="panel-body">
                        Your Application's Landing Page.
                    </div>
                </div>
            </div>
        </div>
    </Container>
);

export default Home;
