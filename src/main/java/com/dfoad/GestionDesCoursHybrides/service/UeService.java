package com.dfoad.GestionDesCoursHybrides.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.dfoad.GestionDesCoursHybrides.modele.Ue;
import com.dfoad.GestionDesCoursHybrides.repository.UeRepository;

import jakarta.transaction.Transactional;
@Service
@Transactional

public class UeService {
    

    @Autowired
    private UeRepository ueRepository;


   
   public List<Ue> lister_Ue(){
      return ueRepository.findAll();
   }
    
   public Optional<Ue> lister_UnUe(Long id){
      return ueRepository.findById(id);
   }

   public Ue rechercher_Ue(Long id){
      return ueRepository.findById(id).get();
   }

   public Ue ajouter_Ue(Ue ue){
      return ueRepository.save(ue);
   }

   public Ue modifier_Ue(Ue ue, Long id){
      Ue existUe = rechercher_Ue(id);
      if (existUe != null) {
         existUe.setBase(ue.getBase());
         existUe.setCode(ue.getCode());
         existUe.setEcs(ue.getEcs());
         existUe.setLibelle(ue.getLibelle());
         existUe.setParcoursUes(ue.getParcoursUes());
         return ueRepository.save(ue);
      }
      return null;
   }


   public void supprimer_Ue(Long id){
    ueRepository.deleteById(id);
   }

 


    
}
