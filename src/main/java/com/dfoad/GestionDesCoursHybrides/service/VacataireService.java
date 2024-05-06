package com.dfoad.GestionDesCoursHybrides.service;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.dfoad.GestionDesCoursHybrides.modele.Vacataire;
import com.dfoad.GestionDesCoursHybrides.repository.VacataireRepository;
import jakarta.transaction.Transactional;
@Service
@Transactional
public class VacataireService {
    

    @Autowired
    private VacataireRepository vacataireRepository;


   
   public List<Vacataire> lister_Vacataire(){
      return vacataireRepository.findAll();
   }
    
   public Optional<Vacataire> lister_UnVacataire(Long id){
      return vacataireRepository.findById(id);
   }

   public Vacataire rechercher_Vacataire(Long id){
      return vacataireRepository.findById(id).get();
   }

   public Vacataire ajouter_Vacataire(Vacataire vacataire){
      return vacataireRepository.save(vacataire);
   }

   public Vacataire modifier_Vacataire(Vacataire vacataire, Long id){
      Vacataire exisVacataire = rechercher_Vacataire(id);
      if (exisVacataire != null) {
         exisVacataire.setContrats(vacataire.getContrats());
         exisVacataire.setCours(vacataire.getCours());
         exisVacataire.setEstFonctionnaire(vacataire.getEstFonctionnaire());
         exisVacataire.setMatricule(vacataire.getMatricule());
         exisVacataire.setNom(vacataire.getNom());
         exisVacataire.setPeriode(vacataire.getPeriode());
         exisVacataire.setPrenom(vacataire.getPrenom());
         exisVacataire.setStatus(vacataire.getStatus());
         return vacataireRepository.save(vacataire);   
      }
      return null;
   }


   public void supprimer_Vacataire(Long id){
    vacataireRepository.deleteById(id);
   }

}
