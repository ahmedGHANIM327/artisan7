package client;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Collection;
import java.util.List;

import javax.ejb.EJB;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import artisan.ArtisanImpl;
import artisan.IArtisanLocal;
import artisan.Artisan;



/**
 * Servlet implementation class Serv
 */
@WebServlet("/client")
public class ServClient extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	@EJB
	private IClientLocal metierClient;
	
	@EJB
	private IArtisanLocal metierArtisan;
	
    /**
     * Default constructor. 
     */
    public ServClient() {
    	metierClient = new ClientImpl();
    	metierArtisan = new ArtisanImpl();
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		PrintWriter out = response.getWriter();
		
		//Pour la gestion des clients
		//////////////////////////////////
		response.setContentType("json");
		String op = request.getParameter("op");
		
		// lister les users enregistrer dans la base de données.
		if (op.equals("listerAllClients")) {
			Collection<Client> clients = metierClient.getClients();
			//creation d'array json
			JsonArray arr = new JsonArray() ;
			for (Client client : clients) {
				JsonObject obj = new JsonObject();
				obj.addProperty("id", client.getId());
				obj.addProperty("name", client.getName());
				obj.addProperty("email", client.getEmail());
				obj.addProperty("password", client.getPassword());
				obj.addProperty("phone", client.getPhone());
				arr.add(obj);
			}
			out.print(arr);
		}
		
		//Ajout d'un utilisateur
		if(op.equals("addNewUser"))
		{
			boolean userExist = false;
			String name = request.getParameter("name");
			String email = request.getParameter("email");
			String password = request.getParameter("password");
			String phone = request.getParameter("phone");
			
			
			// Check if user already exist by email
			for(Client client : metierClient.getClients())
			{
				if(client.getEmail().equals(email))
				{
					userExist = true;
				}
			}
			for(Artisan artisan : metierArtisan.getArtisans())
			{
				if(artisan.getEmail().equals(email))
				{
					userExist = true;
				}
			}
			
			JsonArray arr = new JsonArray() ;
			JsonObject obj = new JsonObject();
			if(userExist)
			{
				obj.addProperty("add",false);
				obj.addProperty("message", "Client existe !");
			}
			else
			{
				Client newClient = new Client();
				newClient.setEmail(email);
				newClient.setName(name);
				newClient.setPassword(password);
				newClient.setPhone(phone);
				metierClient.addNewClient(newClient);
				obj.addProperty("add",true);
				obj.addProperty("message", "Client ajoute !");
			}
			arr.add(obj);
			out.print(arr);
		}
		
		//Modifier les champs du client
		if(op.equals("updateClient"))
		{
			String id_client = request.getParameter("id");
			String parametre = request.getParameter("parametre");
			String newValue = request.getParameter("newValue");
			
			metierClient.updateClient(Long.parseLong(id_client), parametre, newValue);
		}
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
