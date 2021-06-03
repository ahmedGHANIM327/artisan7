package artisan;

import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;


@Stateless(name = "AR")
public class ArtisanImpl implements IArtisanLocal{
	
	@PersistenceContext(unitName = "artisan7")
	EntityManager em;

	@SuppressWarnings("unchecked")
	@Override
	public List<Artisan> getArtisans() {
		Query req = em.createQuery("select a from Artisan a");
		return req.getResultList();
	}

	@Override
	public void addNewArtisan(Artisan a) {
		em.persist(a);
		
	}
	
	/*
	 * Update client
	 */
	@Override
	public void updateArtisan(long id_artisan, String parametre, String newValue) {
		Artisan a = em.find(Artisan.class, id_artisan);
		switch (parametre) {
		case "name":
			a.setName(newValue);
			break;
		case "password":
			a.setPassword(newValue);
			break;
		case "phone":
			a.setPhone(newValue);
			break;
		case "secteur":
			a.setSecteur(newValue);
			break;
		case "adresse":
			a.setAdresse(newValue);
			break;
		default:
			a.setBiographie(newValue);
			break;
		}
	}

	@Override
	public Artisan getArtisanByEmail(String email) {
		Query req = em.createQuery("select a from Artisan a where a.email like :e");
		req.setParameter("e", email);
		if(req.getResultList().size() == 0)
		{
			return null;
		}
		return (Artisan) req.getResultList().get(0);
	}

	/*
	 * Ajouter un projet
	 */
	@Override
	public void addProject(long id_owner, String name) {
		Project p = new Project();
		Artisan a = em.find(Artisan.class, id_owner);
		p.setName(name);
		p.setOwner(a);	
		em.persist(p);
	}
	
	/*
	 * supprimer un projet
	 */
	@Override
	public void deleteProject(long id_project)
	{
		Query req = em.createQuery("DELETE FROM Project p WHERE p.id= :id");
		req.setParameter("id", id_project);
        req.executeUpdate();
	}

}
