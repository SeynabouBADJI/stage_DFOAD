/* package com.dfoad.GestionDesCoursHybrides.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dfoad.GestionDesCoursHybrides.modele.Formation;
import com.dfoad.GestionDesCoursHybrides.modele.Domaine;
import com.dfoad.GestionDesCoursHybrides.repository.DomaineRepository;

import jakarta.transaction.Transactional;
@Service
@Transactional

public class DomaineService {
    

    @Autowired
    private DomaineRepository domaineRepository;


   
   public List<Domaine> lister_Domaine(){
      return domaineRepository.findAll();
   }
    
   public Optional<Domaine> lister_UnDomaine(Long id){
      return domaineRepository.findById(id);
   }

   public Domaine rechercher_Domaine(Long id){
      return domaineRepository.findById(id).get();
   }

   public Domaine ajouter_Domaine(Domaine domaine){
      return domaineRepository.save(domaine);
   }

   public Domaine modifier_Domaine(Domaine domaine, Long id){
      domaine.setId(id);
      return domaineRepository.save(domaine);
   }


   public void supprimer_Domaine(Long id){
    domaineRepository.deleteById(id);
   }



    
}
 */