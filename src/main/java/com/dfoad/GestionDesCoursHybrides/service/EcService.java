package com.dfoad.GestionDesCoursHybrides.service;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.dfoad.GestionDesCoursHybrides.modele.Ec;
import com.dfoad.GestionDesCoursHybrides.repository.EcRepository;

import jakarta.transaction.Transactional;
@Service
@Transactional

public class EcService {
    

    @Autowired
    private EcRepository ecRepository;


   
   public List<Ec> lister_Ec(){
      return ecRepository.findAll();
   }
    
   public Optional<Ec> lister_UnEc(Long id){
      return ecRepository.findById(id);
   }

   public Ec rechercher_Ec(Long id){
      return ecRepository.findById(id).get();
   }

   public Ec ajouter_Ec(Ec ec){
      return ecRepository.save(ec);
   }

   public Ec modifier_Ec(Ec ec, Long id){
      Ec existeEc = rechercher_Ec(id);
      if (existeEc != null) {
         existeEc.setBase(ec.getBase());
         existeEc.setCode(ec.getCode());
         existeEc.setCoefficient(ec.getCoefficient());
         existeEc.setCours(ec.getCours());
         existeEc.setDiscipline(ec.getDiscipline());
         existeEc.setEstObligatoire(ec.getEstObligatoire());
         existeEc.setFormuleCalcul(ec.getFormuleCalcul());
         existeEc.setLibelle(ec.getLibelle());
         existeEc.setUe(ec.getUe());
         return ecRepository.save(ec); 
      }
      return null;
      
   }


   public void supprimer_Ec(Long id){
    ecRepository.deleteById(id);
   }

   public List<Ec> listerEcParUe(Long ue) {
      return ecRepository.findByUe(ue);
   }
 


    
}