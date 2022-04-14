import React from 'react';
import { useAuth } from '../contexts/auth';

import FreeRoutes from './FreeRoutes';
import OtherRoutes from './OtherRoutes';

const Routes: React.FC = (props: any) => {
     const { signed, loading } = useAuth();

    if(loading && signed) {
        return (
            <div>
                <h1>Carregando página...</h1>
            </div>
        )
    }
    return signed ? <OtherRoutes /> : <FreeRoutes />
};

export default Routes;