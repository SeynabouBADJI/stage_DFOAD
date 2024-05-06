package com.dfoad.GestionDesCoursHybrides.service;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.dfoad.GestionDesCoursHybrides.modele.Semestre;
import com.dfoad.GestionDesCoursHybrides.repository.SemestreRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional

public class SemestreService {

   @Autowired
   private SemestreRepository semestreRepository;

   public List<Semestre> lister_Semestre() {
      return semestreRepository.findAll();
   }

   public Optional<Semestre> lister_UnSemestre(Long id) {
      return semestreRepository.findById(id);
   }

   public Semestre rechercher_Semestre(Long id) {
      return semestreRepository.findById(id).isPresent() ? semestreRepository.findById(id).get() : null;
   }

   public Semestre ajouter_Semestre(Semestre semestre) {
      return semestreRepository.save(semestre);
   }

   public Semestre modifier_Semestre(Semestre semestre, Long id) {
      Semestre existeSemestre = rechercher_Semestre(id);
      if (existeSemestre != null) {
         existeSemestre.setDateDebut(semestre.getDateDebut());
         existeSemestre.setDateFin(semestre.getDateFin());
         existeSemestre.setNiveau(semestre.getNiveau());
         existeSemestre.setNumero(semestre.getNumero());
         existeSemestre.setParcours(semestre.getParcours());
         return semestreRepository.save(semestre);
      }
      return null;

   }

   public void supprimer_Semestre(Long id) {
      semestreRepository.deleteById(id);

   }

 

   

}
