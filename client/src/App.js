import { Suspense, lazy } from 'react';
import './App.css';
import { AlertMessageProvider } from './contexts/alert-message-context';
import AlertMessage from './components/general/alert-message';
import { Route, Routes } from 'react-router';
import LoadIndicator from './components/general/load-indicator';
import withAuth from './components/general/protected-routes';
import NavBar from './components/nav-bar';
import { PageProvider } from './contexts/page-context';
import Footer from './components/footer';

function lazyImport(route) {
  return lazy(() => import('./pages/'.concat(route)));
}

function buildDynamicRouteElement(elementName) {
  let DynamicElement;
  const elementNameInLowerCase = elementName.toLowerCase();
  if (elementNameInLowerCase.indexOf('login') > -1) {
    DynamicElement = lazyImport(elementNameInLowerCase);
  }
  else {
    DynamicElement = withAuth(lazyImport(elementNameInLowerCase));
  }
  return <DynamicElement/>;
}


function App({ error }) {
  return (
    <AlertMessageProvider>
      <header>
        <NavBar title="Eldar Challenge" />
        <AlertMessage></AlertMessage>
      </header>
      <main className="container mt-3">
        <div className="row justify-content-center">
          <div className="col">
            <PageProvider>
              <Suspense fallback={<LoadIndicator></LoadIndicator>}>
                { (!error) ?
                  <Routes>
                    <Route path="/" element={buildDynamicRouteElement('products')} />
                    <Route path='/Login' element={buildDynamicRouteElement('login')} ></Route>
                    <Route path='/Products' element={buildDynamicRouteElement('products')} ></Route>
                    <Route path='/Product' element={buildDynamicRouteElement('product')} ></Route>
                    <Route path="*" element={buildDynamicRouteElement('page-not-found')} />
                  </Routes>
                :
                  <Routes>
                    <Route element={lazyImport('server-not-ready')} />
                  </Routes>
                }                
              </Suspense>
            </PageProvider>
          </div>
        </div>
      </main>
      <footer>
        <Footer></Footer>
      </footer>
    </AlertMessageProvider>
  );
}

export default App;
