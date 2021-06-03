package artisan;


import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.ejb.EJB;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import client.Client;
import client.ClientImpl;
import client.IClientLocal;

/**
 * Servlet implementation class Serv
 */
@WebServlet("/artisan")
public class ServArtisan extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	@EJB
	private IArtisanLocal metierArtisan;
	
	@EJB
	private IClientLocal metierClient;
	
    /**
     * Default constructor. 
     */
    public ServArtisan() {
    	metierArtisan = new ArtisanImpl();
    	metierClient = new ClientImpl();
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
		if (op.equals("listerAllArtisans")) {
			List<Artisan> artisans = metierArtisan.getArtisans();
			String path = "";
			//creation d'array json
			JsonArray arr = new JsonArray() ;
			for (Artisan artisan : artisans) {
				JsonObject obj = new JsonObject();
				obj.addProperty("id", artisan.getId());
				obj.addProperty("name", artisan.getName());
				obj.addProperty("email", artisan.getEmail());
				obj.addProperty("password", artisan.getPassword());
				obj.addProperty("phone", artisan.getPhone());
				obj.addProperty("biographie", artisan.getBiographie());
				obj.addProperty("secteur", artisan.getSecteur());
				obj.addProperty("adresse", artisan.getAdresse());
				arr.add(obj);
			}
			out.print(arr);
		}
		
		//Ajout d'un artisan
		if(op.equals("addNewArtisan"))
		{
			boolean userExist = false;
			String name = request.getParameter("name");
			String email = request.getParameter("email");
			String password = request.getParameter("password");
			String phone = request.getParameter("phone");
			String secteur = request.getParameter("secteur");
			
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
			 // end check
			
			JsonArray arr = new JsonArray() ;
			JsonObject obj = new JsonObject();
			if(userExist)
			{
				obj.addProperty("add",false);
				obj.addProperty("message", "Artisan existe !");
			}
			else
			{
				Artisan newArtisan = new Artisan();
				newArtisan.setName(name);
				newArtisan.setEmail(email);
				newArtisan.setPassword(password);
				newArtisan.setPhone(phone);
				newArtisan.setSecteur(secteur);
				metierArtisan.addNewArtisan(newArtisan);
				
				obj.addProperty("add",true);
				obj.addProperty("message", "Artisan ajoute !");
			}
			arr.add(obj);
			out.print(arr);
		}
		
		//Modifier les champs du client
		if(op.equals("updateArtisan"))
		{
			String id_artisan = request.getParameter("id");
			String parametre = request.getParameter("parametre");
			String newValue = request.getParameter("newValue");
			
			metierArtisan.updateArtisan(Long.parseLong(id_artisan), parametre, newValue);
		}
		
		// Ajouter un projet
		if(op.equals("addProject"))
		{
			String id_artisan = request.getParameter("id");
			String nameProject = request.getParameter("nameProject");
			metierArtisan.addProject(Long.parseLong(id_artisan), nameProject);
		}
		
		// Ajouter un projet
		if(op.equals("deleteProject"))
		{
			String id_project = request.getParameter("id");
			metierArtisan.deleteProject(Long.parseLong(id_project));
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
