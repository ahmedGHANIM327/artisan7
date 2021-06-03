package client;

import java.io.Serializable;
import java.util.List;

import javax.persistence.*;

import artisan.Artisan;
import demande.Demande;

@Entity
@Table(name="client")
public class Client implements Serializable{
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id" ,unique = true , length = 11)
	private Long id;
	
	@Column(name = "name" ,length = 40)
	private String name;
	
	@Column(name = "email" ,unique = true , length = 50)
	private String email;
	
	@Column(name = "password" ,length = 30)
	private String password;
	
	@Column(name = "phone" ,length = 20)
	private String phone;
	
	@OneToMany(mappedBy = "demandeur" , cascade = CascadeType.REMOVE)
	private List<Demande> mes_demandes;
	
	@ManyToMany(fetch = FetchType.EAGER)
	private List<Artisan> favoris;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
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

}
