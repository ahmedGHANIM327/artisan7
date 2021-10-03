package artisan;

import java.util.List;

import javax.ejb.Local;


@Local
public interface IArtisanLocal {
	
	public List<Artisan> getArtisans();
	
	public void addNewArtisan(Artisan a);
	
	/*
	 * Update artisan value
	 */
	public void updateArtisan(long id_artisan , String parametre , String newValue);
	
	/*
	 * Ajouter un projet
	 */
	public void addProject(long id_owner , String name);
	
	public void deleteProject(long id_project);
	
	public Artisan getArtisanByEmail(String email);

}
