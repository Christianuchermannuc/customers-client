import './App.css';
import Customers from './containers/customers'
import Layout from './hoc/Layout'

function App() {
  return (
    <div>
      <Layout>
        <Customers></Customers>
      </Layout>
    </div>
  );
}

export default App;
