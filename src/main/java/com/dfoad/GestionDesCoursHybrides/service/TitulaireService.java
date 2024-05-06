package com.dfoad.GestionDesCoursHybrides.service;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.dfoad.GestionDesCoursHybrides.modele.Titulaire;
import com.dfoad.GestionDesCoursHybrides.repository.TitulaireRepository;
import jakarta.transaction.Transactional;
@Service
@Transactional
public class TitulaireService {
    

    @Autowired
    private TitulaireRepository titulaireRepository;


   
   public List<Titulaire> lister_Titulaire(){
      return titulaireRepository.findAll();
   }
    
   public Optional<Titulaire> lister_UnTitulaire(Long id){
      return titulaireRepository.findById(id);
   }

   public Titulaire rechercher_Titulaire(Long id){
      return titulaireRepository.findById(id).get();
   }

   public Titulaire ajouter_Titulaire(Titulaire titulaire){
      return titulaireRepository.save(titulaire);
   }

   public Titulaire modifier_Titulaire(Titulaire titulaire, Long id){
      Titulaire exisTitulaire = rechercher_Titulaire(id);
      if (exisTitulaire != null) {
         exisTitulaire.setContrats(titulaire.getContrats());
         exisTitulaire.setCours(titulaire.getCours());
         exisTitulaire.setEstFonctionnaire(titulaire.getEstFonctionnaire());
         exisTitulaire.setMatricule(titulaire.getMatricule());
         exisTitulaire.setNom(titulaire.getNom());
         exisTitulaire.setPoste(titulaire.getPoste());
         exisTitulaire.setPrenom(titulaire.getPrenom());
         exisTitulaire.setStatus(titulaire.getStatus());
         return titulaireRepository.save(titulaire);
      }
      return null;
   }


   public void supprimer_Titulaire(Long id){
    titulaireRepository.deleteById(id);
   }

}
