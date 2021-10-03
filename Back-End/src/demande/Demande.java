package demande;

import client.Client;
import devis.Devis;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;


enum Etat {en_cours , finis};
@Entity
public class Demande implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String titre,description,date_creation,date_realisation,photo,secteur;
	private String adresse;
//	private Etat etat;
	private Boolean etat; // 0 pour encours ; 1 pour finis
	
	@OneToOne(fetch = FetchType.EAGER)
	private Client demandeur;
	
	@OneToMany(fetch = FetchType.EAGER)
	private List<Devis> listDevis;
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Client getDemandeur() {
		return demandeur;
	}

	public void setDemandeur(Client demandeur) {
		this.demandeur = demandeur;
	}

	public List<Devis> getListDevis() {
		return listDevis;
	}

	public void addDevis(Devis devis) {
		this.listDevis.add(devis);
	}

	public String getTitre() {
		return titre;
	}

	public void setTitre(String titre) {
		this.titre = titre;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getDate_creation() {
		return date_creation;
	}

	public void setDate_creation(String date_creation) {
		this.date_creation = date_creation;
	}

	public String getDate_realisation() {
		return date_realisation;
	}

	public void setDate_realisation(String date_realisation) {
		this.date_realisation = date_realisation;
	}

	public String getPhoto() {
		return photo;
	}

	public void setPhoto(String photo) {
		this.photo = photo;
	}

	public String getSecteur() {
		return secteur;
	}

	public void setSecteur(String secteur) {
		this.secteur = secteur;
	}

	public String getAdresse() {
		return adresse;
	}

	public void setAdresse(String adresse) {
		this.adresse = adresse;
	}

	public Boolean getEtat() {
		return etat;
	}

	public void setEtat(Boolean etat) {
		this.etat = etat;
	}
}