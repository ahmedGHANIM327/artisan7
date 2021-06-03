package demande;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Optional;
import java.util.logging.Logger;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.TypedQuery;

import client.Client;

@Stateless
public class FacadeDemande {
	
	@PersistenceContext
	private EntityManager em;

	public Demande ajoutDemande(Demande demande, long id_client) {
		//Parameter<?> id__client = ((Query) em).getParameter("userId");
		Client client = em.find(Client.class, id_client);
		demande.setDemandeur(client);
		em.persist(demande);
		return demande;
	}
	
	@SuppressWarnings({ "unchecked" })
	public Collection<Demande> listeDemandes() {
		Query req =  em.createQuery("select a from Demande a where a.etat=0");
	    return req.getResultList();
	}
	
	@SuppressWarnings({ "unchecked" })
	public Collection<Demande> listeDemandes_Encours(long id_client) {
		ArrayList<Demande> listeDemandes = new ArrayList<Demande>();
		Client client = em.find(Client.class, id_client);
		Query req =  em.createQuery("select a from Demande a where a.etat=0");
	    Collection<Demande> listeDemandeur = req.getResultList();
	    for (Demande demandeur:listeDemandeur) {
	    	if (demandeur.getDemandeur().equals(client))
	    		listeDemandes.add(demandeur);
	    }
	    return listeDemandes;
	}
	
	@SuppressWarnings({ "unchecked" })
	public Collection<Demande> listeDemandes_Finis(long id_client) {
		ArrayList<Demande> listeDemandes = new ArrayList<Demande>();
		Client client = em.find(Client.class, id_client);
		Query req =  em.createQuery("select a from Demande a where a.etat=1");
	    Collection<Demande> listeDemandeur = req.getResultList();
	    for (Demande demandeur:listeDemandeur) {
	    	if (demandeur.getDemandeur().equals(client))
	    		listeDemandes.add(demandeur);
	    }
	    return listeDemandes;
	}

	public Demande getDemandeById(Integer id) {
		return em.find(Demande.class,id);
	}

	@SuppressWarnings("unchecked")
	public Collection<Demande> getDemandeBySecteur(String id) {
		Query ps = em.createQuery("select * from Demande where secteur='"+id+"'");
		return ps.getResultList();
	}


	public Optional<Demande> rechercheDemande(Integer id) {
		TypedQuery<Demande> typedQuery = em.createQuery("select t from Demande t where t.id = :id", Demande.class).setParameter("id", id);
		try {	
			Demande user = typedQuery.getSingleResult();
			return Optional.of(user);
		} catch (NoResultException e) {
			Logger.getLogger(Demande.class.getName()).info(e.getLocalizedMessage());
		}
		return Optional.empty();
	}

	public void supprimeDemande(Demande demande) {
		em.remove(demande);
	}
	
	public void passeToHistory(Integer id)
	{
		Demande demande = em.find(Demande.class, id);
		demande.setEtat(true);
	}

}
