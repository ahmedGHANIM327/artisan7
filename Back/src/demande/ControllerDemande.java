package demande;

import java.util.Optional;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.ejb.TransactionAttribute;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;


@Stateless
@Path("/Demande")
public class ControllerDemande {
	@EJB
	private FacadeDemande dao;
	
	@POST
	@Path("/ajout{id}")// id refers to the current client 
	@Produces(MediaType.APPLICATION_JSON)
	public Demande ajoutDemande(@PathParam("id") Long id,Demande demande) {
		//String id = sessionContext.getCallerPrincipal().getName();
		return dao.ajoutDemande(demande,id);
	}
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/AllDemandes")
	public Response index() {
		return Response.ok(dao.listeDemandes()).build();
	}
	
	@GET
	@Path("/encours={id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response index(@PathParam("id") Integer id) {
		return Response.ok(dao.listeDemandes_Encours(id)).build();
	}
	
	@GET
	@Path("/history={id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response history(@PathParam("id") Integer id) {
		return Response.ok(dao.listeDemandes_Finis(id)).build();
	}
	
	@GET
	@Path("/Tohistory={id}")
	public String Tohistory(@PathParam("id") Integer id) {
		dao.passeToHistory(id);
		return "Commande passée aux historiques";
	}
	
	@GET
	@Path("id={id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response showid(@PathParam("id") Integer id) {
		return Response.ok(dao.getDemandeById(id)).build();
	}
	
	@GET
	@Path("secteur={id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response showsmetier(@PathParam("id") String id) {
		return Response.ok(dao.getDemandeBySecteur(id)).build();
	}
	
	@GET
	@Path("/supprime={id}")
	@Produces(MediaType.TEXT_HTML)
	public String delete(@PathParam("id") Integer id) {
		Optional<Demande> optional = dao.rechercheDemande(id);
		if (optional.isPresent()) {
			dao.supprimeDemande(optional.get());
			return "Suppression de demandes";
		}
		return "Demande introuvable";
	}
	
}