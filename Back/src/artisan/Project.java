package artisan;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="project")
public class Project implements Serializable{
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "name" ,length = 40 , nullable = false)
	private String name;
	
	@ManyToOne
	private Artisan owner;

	public Project() {
	}

	public Long getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Artisan getOwner() {
		return owner;
	}

	public void setOwner(Artisan owner) {
		this.owner = owner;
	}

	public void setId(Long id) {
		this.id = id;
	}

}
