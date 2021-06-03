
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

import artisan.Artisan;
import artisan.Project;
import artisan.ArtisanImpl;
import artisan.IArtisanLocal;
import client.Client;
import client.ClientImpl;
import client.IClientLocal;

/**
 * Servlet implementation class Serv
 */
@WebServlet("/Auth")
public class ServAuth extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	@EJB
	private IArtisanLocal metierArtisan;
	
	@EJB
	private IClientLocal metierClient;
	
    /**
     * Default constructor. 
     */
    public ServAuth() {
    	metierArtisan = new ArtisanImpl();
    	metierClient = new ClientImpl();
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		PrintWriter out = response.getWriter();
		JsonObject obj = new JsonObject();
		JsonObject obj1 = new JsonObject();
		
		//element de test
		Artisan artisan;
		Client client;
		
		//Pour la gestion des clients
		//////////////////////////////////
		response.setContentType("json");
		
		// get Infos 
		String email = request.getParameter("email");
		String password = request.getParameter("password");
		
		artisan = metierArtisan.getArtisanByEmail(email);
		client = metierClient.getClientByEmail(email);
		
		/////////////////
		if(artisan != null)
		{
			if(artisan.getPassword().equals(password))
			{
				obj.addProperty("get",true);
				obj.addProperty("role", "artisan");
				//former l'artisan
				obj1.addProperty("id", artisan.getId());
				obj1.addProperty("name", artisan.getName());
				obj1.addProperty("email", artisan.getEmail());
				obj1.addProperty("phone", artisan.getPhone());
				obj1.addProperty("biographie", artisan.getBiographie());
				obj1.addProperty("adresse", artisan.getAdresse());
				obj1.addProperty("secteur", artisan.getSecteur());
				obj1.addProperty("note", artisan.getNote());
				///////////////////////////////////////////////////////
				List<Project> projects = artisan.getMy_projects();
				JsonArray array = new JsonArray();
				for(int i=0 ; i<projects.size();i++)
				{
					JsonObject objPR_I = new JsonObject();
					objPR_I.addProperty("id", projects.get(i).getId());
					objPR_I.addProperty("name", projects.get(i).getName());
					array.add(objPR_I);
				}
				///
				obj.add("artisan", obj1);
				obj.add("projects", array);
			}
			else
			{
				obj.addProperty("get",false);
				obj.addProperty("message", "Mot de passe incorrect");
			}
		}
		else if (client != null)
		{
			if(client.getPassword().equals(password))
			{
				obj.addProperty("get",true);
				obj.addProperty("role", "client");
				
				//former client
				obj1.addProperty("id", client.getId());
				obj1.addProperty("name", client.getName());
				obj1.addProperty("email", client.getEmail());
				obj1.addProperty("phone", client.getPhone());
				///
				obj.add("client", obj1);
			}
			else
			{
				obj.addProperty("get",false);
				obj.addProperty("message", "Mot de passe incorrect");
			}
		}
		else
		{
			obj.addProperty("get",false);
			obj.addProperty("message", "Utilisateur introuvable");
		}
		out.print(obj);	
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
