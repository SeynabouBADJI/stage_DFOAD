package com.dfoad.GestionDesCoursHybrides.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.dfoad.GestionDesCoursHybrides.modele.Ufr;
import com.dfoad.GestionDesCoursHybrides.repository.UfrRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional

public class UfrService {

   @Autowired
   private UfrRepository ufrRepository;

   public List<Ufr> lister_Ufr() {
      return ufrRepository.findAll();
   }

   public Optional<Ufr> lister_UnUfr(Long id) {
      return ufrRepository.findById(id);
   }

   public Ufr rechercher_Ufr(Long id) {
      return ufrRepository.findById(id).get();
   }

   public Ufr ajouter_Ufr(Ufr ufr) {
      return ufrRepository.save(ufr);
   }

   public Ufr modifier_Ufr(Ufr ufr, Long id) {
      Ufr existeUfr = rechercher_Ufr(id);
      if (existeUfr != null) {
         existeUfr.setAbreviation(ufr.getAbreviation());
         existeUfr.setArreteCreation(ufr.getArreteCreation());
         existeUfr.setDateCreation(ufr.getDateCreation());
         existeUfr.setEmail(ufr.getEmail());
         existeUfr.setDepartements(ufr.getDepartements());
         existeUfr.setLibelle(ufr.getLibelle());
         existeUfr.setType(ufr.getType());
         return ufrRepository.save(ufr);
      }
      return null;
   }

   public void supprimer_Ufr(Long id) {
      ufrRepository.deleteById(id);
   }

 
}
