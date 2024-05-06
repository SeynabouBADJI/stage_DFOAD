package com.dfoad.GestionDesCoursHybrides.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.dfoad.GestionDesCoursHybrides.modele.ResponsableDfoad;
import com.dfoad.GestionDesCoursHybrides.repository.ResponsableDfoadRepository;

import jakarta.transaction.Transactional;
@Service
@Transactional

public class ResponsableDfoadService {
    

    @Autowired
    private ResponsableDfoadRepository responsableDfoadRepository;


   
   public List<ResponsableDfoad> lister_ResponsableDfoad(){
      return responsableDfoadRepository.findAll();
   }
    
   public Optional<ResponsableDfoad> lister_UnResponsableDfoad(Long id){
      return responsableDfoadRepository.findById(id);
   }

   public ResponsableDfoad rechercher_ResponsableDfoad(Long id){
      return responsableDfoadRepository.findById(id).get();
   }

   public ResponsableDfoad ajouter_ResponsableDfoad(ResponsableDfoad responsableDfoad){
      return responsableDfoadRepository.save(responsableDfoad);
   }

   public ResponsableDfoad modifier_ResponsableDfoad(ResponsableDfoad responsableDfoad, Long id){
      ResponsableDfoad existResponsableDfoad =rechercher_ResponsableDfoad(id);
      if (existResponsableDfoad != null) {
         existResponsableDfoad.setContrats(responsableDfoad.getContrats());
         existResponsableDfoad.setNom(responsableDfoad.getNom());
         existResponsableDfoad.setPassword(responsableDfoad.getPassword());
         existResponsableDfoad.setPseudo(responsableDfoad.getPseudo());
         existResponsableDfoad.setRole(responsableDfoad.getRole());
         return responsableDfoadRepository.save(responsableDfoad);
      }
      return null;
   }


   public void supprimer_ResponsableDfoad(Long id){
    responsableDfoadRepository.deleteById(id);
   }
    public ResponsableDfoad findByUsername(String username) {
        return responsableDfoadRepository.findByPseudo(username).get();
    }
  

    
}
