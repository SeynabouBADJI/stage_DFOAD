package com.dfoad.GestionDesCoursHybrides.service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.dfoad.GestionDesCoursHybrides.modele.AnneeScolaire;
import com.dfoad.GestionDesCoursHybrides.repository.AnneeScolaireRepository;

import jakarta.transaction.Transactional;
@Service
@Transactional

public class AnneeScolaireService {
    

    @Autowired
    private AnneeScolaireRepository anneeScolaireRepository;


   
   public List<AnneeScolaire> lister_AnneeScolaire(){
      return anneeScolaireRepository.findAll();
   }
    
   public Optional<AnneeScolaire> lister_UnAnneeScolaire(Long id){
      return anneeScolaireRepository.findById(id);
   }

   public AnneeScolaire rechercher_AnneeScolaire(Long id){
      return anneeScolaireRepository.findById(id).get();
   }

   public AnneeScolaire ajouter_AnneeScolaire(AnneeScolaire anneeScolaire){
      return anneeScolaireRepository.save(anneeScolaire);
   }

   public AnneeScolaire modifier_AnneeScolaire(AnneeScolaire anneeScolaire, Long id){
      AnneeScolaire annee = rechercher_AnneeScolaire(id);
      if (annee != null) {
         annee.setLibelle(anneeScolaire.getLibelle());
         annee.setDateDebut(anneeScolaire.getDateDebut());
         annee.setDateFin(anneeScolaire.getDateFin());
         annee.setFormations(anneeScolaire.getFormations());
         return anneeScolaireRepository.save(anneeScolaire);
      }  
      return null;
   }

   public void supprimer_AnneeScolaire(Long id){
    anneeScolaireRepository.deleteById(id);
   }



    
}
