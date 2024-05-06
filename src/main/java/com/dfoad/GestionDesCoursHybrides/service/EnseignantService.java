package com.dfoad.GestionDesCoursHybrides.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.dfoad.GestionDesCoursHybrides.modele.Enseignant;
import com.dfoad.GestionDesCoursHybrides.repository.EnseignantRepository;

import jakarta.transaction.Transactional;
@Service
@Transactional

public class EnseignantService {
    

    @Autowired
    private EnseignantRepository enseignantRepository;


   
   public List<Enseignant> lister_Enseignant(){
      return enseignantRepository.findAll();
   }
    
   public Optional<Enseignant> lister_UnEnseignant(Long id){
      return enseignantRepository.findById(id);
   }

   public Enseignant rechercher_Enseignant(Long id){
      return enseignantRepository.findById(id).get();
   }

   public Enseignant ajouter_Enseignant(Enseignant enseignant){
      return enseignantRepository.save(enseignant);
   }

   public Enseignant modifier_Enseignant(Enseignant enseignant, Long id){
      Enseignant existeEnseignant = rechercher_Enseignant(id);
      if (existeEnseignant != null) {
         existeEnseignant.setContrats(enseignant.getContrats());
         existeEnseignant.setCours(enseignant.getCours());
         existeEnseignant.setEstFonctionnaire(enseignant.getEstFonctionnaire());
         existeEnseignant.setMatricule(enseignant.getMatricule());
         existeEnseignant.setNom(enseignant.getNom());
         existeEnseignant.setPrenom(enseignant.getPrenom());
         existeEnseignant.setStatus(enseignant.getStatus());
         return enseignantRepository.save(enseignant);
      }
      return null;
      
   }


   public void supprimer_Enseignant(Long id){
    enseignantRepository.deleteById(id);
   }

  
  public List<Enseignant> listerEnseignantParCours(Long cours) {
   return enseignantRepository.findByCours(cours);
}

    
}
