<<<<<<< HEAD
import { Suspense } from 'react';
import Loader from './Loader';


const Loadable = (Component) => (props) =>
    (
        <Suspense fallback={<Loader />}>
            <Component {...props} />
        </Suspense>
    );

export default Loadable;
=======
import { Suspense } from 'react';

// project imports
import Loader from './Loader';

// ==============================|| LOADABLE - LAZY LOADING ||============================== //

const Loadable = (Component) => (props) =>
    (
        <Suspense fallback={<Loader />}>
            <Component {...props} />
        </Suspense>
    );

export default Loadable;
>>>>>>> a0d7b77f029b977fd804aed91e17ffad3b5bf592
