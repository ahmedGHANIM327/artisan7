package devis;

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
@Path("/Devis")
public class ControllerDevis {
	@EJB
	private FacadeDevis dao;
	
	@POST
	@Path("/ajout")
	@Produces(MediaType.APPLICATION_JSON)
	public Devis ajoutDevis(Devis demande) {
		return dao.ajoutDevis(demande);
	}
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response index() {
		return Response.ok(dao.listeDevis()).build();
	}
	
	@GET
	@Path("id={id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response showid(@PathParam("id") Integer id) {
		return Response.ok(dao.getDevisById(id)).build();
	}
	
	@GET
	@Path("demande={id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response showsmetier(@PathParam("id") Integer id) {
		return Response.ok(dao.getDevisByDemande(id)).build();
	}
	
	@DELETE
	@Path("/supprime={id}")
	@TransactionAttribute
	public Response delete(@PathParam("id") Integer id) {
		Optional<Devis> optional = dao.rechercheDevis(id);
		if (optional.isPresent()) {
			dao.supprimeDevis(optional.get());
			return Response.noContent().build();
		}
		return Response.status(Status.NOT_FOUND).build();
	}
}
