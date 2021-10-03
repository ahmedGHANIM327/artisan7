package artisan;


import java.io.Serializable;

import java.sql.Blob;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import devis.Devis;

@Entity
@Table(name="artisan")
public class Artisan implements Serializable{
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id" ,unique = true , length = 11)
	private Long id;
	
	@Column(name = "name" ,length = 40 , nullable = false)
	private String name;
	
	@Column(name = "email" ,unique = true , length = 50 , nullable = false)
	private String email;
	
	@Column(name = "password" ,length = 30 , nullable = false)
	private String password;
	
	@Column(name = "phone" ,length = 20 , nullable = false)
	private String phone;
	
	@Column(name = "note" , nullable = false)
	private float note;

	@Column(name = "secteur" ,length = 60 , nullable = false)
	private String secteur;

	@Column(name = "adresse" ,length = 250)
	private String adresse;

	@Column(name = "biographie" ,length = 1000)
	private String biographie;
	
	@OneToMany(mappedBy = "owner" , cascade = CascadeType.REMOVE , fetch = FetchType.EAGER)
	private List<Project> my_projects;
	
	@OneToMany(mappedBy = "owner_devis" , cascade = CascadeType.REMOVE , fetch = FetchType.EAGER)
	private List<Devis> my_deviss;
	
	
	public List<Project> getMy_projects() {
		return my_projects;
	}

	public void setMy_projects(List<Project> my_projects) {
		this.my_projects = my_projects;
	}

	public String getSecteur() {
		return secteur;
	}

	public void setSecteur(String secteur) {
		this.secteur = secteur;
	}

	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getAdresse() {
		return adresse;
	}
	public void setAdresse(String adresse) {
		this.adresse = adresse;
	}
	public float getNote() {
		return note;
	}
	public void setNote(float note) {
		this.note = note;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getBiographie() {
		return biographie;
	}
	public void setBiographie(String biographie) {
		this.biographie = biographie;
	}

}
