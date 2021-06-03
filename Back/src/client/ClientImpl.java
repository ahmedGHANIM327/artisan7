package client;

import java.util.Collection;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;



@Stateless
public class ClientImpl implements IClientLocal{
	
	@PersistenceContext(unitName = "artisan7")
	EntityManager em;
	

	@Override
	@SuppressWarnings("unchecked")
	public Collection<Client> getClients() {
		Query req = em.createQuery("select c from Client c");
		return req.getResultList();
	}


	@Override
	public void addNewClient(Client c) {
		em.persist(c);
	}
	
	/*
	 * Update client
	 */
	@Override
	public void updateClient(long id_client, String parametre, String newValue) {
		Client c = em.find(Client.class, id_client);
		switch (parametre) {
		case "name":
			c.setName(newValue);
			break;
		case "password":
			c.setPassword(newValue);
			break;
		default:
			c.setPhone(newValue);
			break;
		}
	}
	


	@Override
	public Client getClientByEmail(String email) {
		Query req = em.createQuery("select c from Client c where c.email like :e");
		req.setParameter("e", email);
		if(req.getResultList().size() == 0)
		{
			return null;
		}
		return (Client) req.getResultList().get(0);
	}


}
