package com.dfoad.GestionDesCoursHybrides.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.dfoad.GestionDesCoursHybrides.modele.Cours;
import com.dfoad.GestionDesCoursHybrides.repository.CoursRepository;

import jakarta.transaction.Transactional;
@Service
@Transactional

public class CoursService {
    

    @Autowired
    private CoursRepository coursRepository;


   
   public List<Cours> lister_Cours(){
      return coursRepository.findAll();
   }
    
   public Optional<Cours> lister_UnCours(Long id){
      return coursRepository.findById(id);
   }

   public Cours rechercher_Cours(Long id){
      return coursRepository.findById(id).get();
   }

   public Cours ajouter_Cours(Cours cours){
      return coursRepository.save(cours);
   }

   public Cours modifier_Cours(Cours cours, Long id){
      Cours existeCours = rechercher_Cours(id);
      if (existeCours != null) {
         existeCours.setLibelle(cours.getLibelle());
         existeCours.setVolumeHoraire(cours.getVolumeHoraire());
         existeCours.setDescription(cours.getDescription());
         existeCours.setEstPresentiel(cours.getEstPresentiel());
         existeCours.setEc(cours.getEc());
         existeCours.setEnseignants(cours.getEnseignants());
         return coursRepository.save(cours);
      }
      return null;
     
   }


   public void supprimer_Cours(Long id){
    coursRepository.deleteById(id);
   }

   public List<Cours> listerCoursParEc(Long ec) {
      return coursRepository.findByEc(ec);
  }

    
}
