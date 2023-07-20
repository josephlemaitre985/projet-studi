import { Link } from 'react-router-dom';
import './AdminNav.css'; 

const AdminNav = () => {
  return (
    <nav className="admin-nav">
      <Link to="/admin/cars">Gérer les voitures</Link>
      <Link to="/admin/openinghours">Modifier les horaires d'ouverture</Link>
      <Link to="/admin/employees">Créer un compte employé</Link>
    </nav>
  );
};

export default AdminNav;
