package devis;

import java.util.Collection;
import java.util.Optional;
import java.util.logging.Logger;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.TypedQuery;

@Stateless
public class FacadeDevis {
	
	@PersistenceContext
	private EntityManager em;

	public Devis ajoutDevis(Devis devis) {
		em.persist(devis);
		return devis;
	}

	@SuppressWarnings("unchecked")
	public Collection<Devis> listeDevis() {
		Query req =  em.createQuery("select a from Devis a");
	    return req.getResultList();
	}

	@SuppressWarnings("unchecked")
	public Collection<Devis> getDevisById(Integer id) {
		Query ps = em.createQuery("SELECT t FROM Devis t WHERE t.id = '"+ id + "'");
		return ps.getResultList();
	}

	@SuppressWarnings("unchecked")
	public Collection<Devis> getDevisByDemande(Integer id) {
		Query ps = em.createQuery("SELECT t FROM Devis t WHERE t.demande.id = '"+ id + "'");
		return ps.getResultList();
	}

	public Optional<Devis> rechercheDevis(Integer id) {
		TypedQuery<Devis> typedQuery = em.createQuery("select t from Devis t where t.id = :id", Devis.class).setParameter("id", id);
		try {	
			Devis user = typedQuery.getSingleResult();
			return Optional.of(user);
		} catch (NoResultException e) {
			Logger.getLogger(Devis.class.getName()).info(e.getLocalizedMessage());
		}
		return Optional.empty();
	}

	public void supprimeDevis(Devis devis) {
		em.remove(devis);
	}
	
}