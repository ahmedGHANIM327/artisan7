package client;

import java.util.Collection;
import javax.ejb.Local;


@Local
public interface IClientLocal {
	
	/*
	 * Get all clients
	 */
	public Collection<Client> getClients();
	
	/*
	 * Add new client
	 */
	public void addNewClient(Client c);
	
	
	/*
	 * Update client value
	 */
	public void updateClient(long id_client , String parametre , String newValue);
	
	/*
	 * Get client by email
	 * for aythentification
	 */
	public Client getClientByEmail(String email);

}

