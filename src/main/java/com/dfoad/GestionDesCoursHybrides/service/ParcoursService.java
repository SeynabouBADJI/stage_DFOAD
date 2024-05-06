package com.dfoad.GestionDesCoursHybrides.service;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.dfoad.GestionDesCoursHybrides.modele.Parcours;
import com.dfoad.GestionDesCoursHybrides.repository.ParcoursRepository;

import jakarta.transaction.Transactional;
@Service
@Transactional

public class ParcoursService {
    

    @Autowired
    private ParcoursRepository parcoursRepository;


   
   public List<Parcours> lister_Parcours(){
      return parcoursRepository.findAll();
   }
    
   public Optional<Parcours> lister_UnParcours(Long id){
      return parcoursRepository.findById(id);
   }

   public Parcours rechercher_Parcours(Long id){
      return parcoursRepository.findById(id).get();
   }

   public Parcours ajouter_Parcours(Parcours parcours){
      return parcoursRepository.save(parcours);
   }

   public Parcours modifier_Parcours(Parcours parcours, Long id){
     Parcours existeParcours = rechercher_Parcours(id);
     if (existeParcours != null) {
      existeParcours.setLibelle(parcours.getLibelle());
      existeParcours.setParcoursUes(parcours.getParcoursUes());
      existeParcours.setSemestre(parcours.getSemestre());
      existeParcours.setType(parcours.getType());
      return parcoursRepository.save(parcours);
     }
     return null;
   }


   public void supprimer_Parcours(Long id){
    parcoursRepository.deleteById(id);
   }



  public List<Parcours> listerParcoursParSemestre(Long idSemestre) {
   return parcoursRepository.findBySemestre(idSemestre);
}


    
}
