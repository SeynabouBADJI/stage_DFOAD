package com.dfoad.GestionDesCoursHybrides.service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.dfoad.GestionDesCoursHybrides.modele.Departement;
import com.dfoad.GestionDesCoursHybrides.repository.DepartementRepository;
import jakarta.transaction.Transactional;

@Service
@Transactional
public class DepartementService {

   @Autowired
   private DepartementRepository departementRepository;

   public List<Departement> lister_Departement() {
      return departementRepository.findAll();
   }

   public Optional<Departement> lister_UnDepartement(Long id) {
      return departementRepository.findById(id);
   }

   public Departement rechercher_Departement(Long id) {
      return departementRepository.findById(id).get();
   }

   public Departement ajouter_Departement(Departement departement) {
      return departementRepository.save(departement);
   }

   public Departement modifier_Departement(Departement departement, Long id) {
      Departement exiDepartement = rechercher_Departement(id);
      if (exiDepartement != null) {
         exiDepartement.setLibelle(departement.getLibelle());
         exiDepartement.setAbreviation(departement.getAbreviation());
         exiDepartement.setArreteCreation(departement.getArreteCreation());
         exiDepartement.setDateCreation(departement.getDateCreation());
         exiDepartement.setFormations(departement.getFormations());
         exiDepartement.setEmail(departement.getEmail());
         exiDepartement.setType(departement.getType());
         exiDepartement.setUfr(departement.getUfr());
         return departementRepository.save(departement);
      }
      return null;
      
   }

   public void supprimer_Departement(Long id) {
      departementRepository.deleteById(id);
   }

   public List<Departement> listerDepartementParUfr(Long ufr) {
      return departementRepository.findByUfr(ufr);
   }
   public List<Departement> listerDepartementParFormation(Long formation) {
      return departementRepository.findByFormationDepartement(formation);
   }

}
