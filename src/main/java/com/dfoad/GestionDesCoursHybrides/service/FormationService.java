package com.dfoad.GestionDesCoursHybrides.service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.dfoad.GestionDesCoursHybrides.modele.Formation;
import com.dfoad.GestionDesCoursHybrides.repository.FormationRepository;
import jakarta.transaction.Transactional;

@Service
@Transactional

public class FormationService {

   @Autowired
   private FormationRepository formationRepository;

   public List<Formation> lister_Formation() {
      return formationRepository.findAll();
   }

   public Optional<Formation> lister_UnFormation(Long id) {
      return formationRepository.findById(id);
   }

   public Formation rechercher_Formation(Long id) {
      return formationRepository.findById(id).get();
   }

   public Formation ajouter_Formation(Formation formation) {
      return formationRepository.save(formation);
   }

   public Formation modifier_Formation(Formation formation, Long id) {
      Formation existeFormation = rechercher_Formation(id);
      if (existeFormation != null) {
         existeFormation.setAnneeScolaire(formation.getAnneeScolaire());
         existeFormation.setEstValide(formation.getEstValide());
         existeFormation.setGrade(formation.getGrade());
         existeFormation.setLibelle(formation.getLibelle());
         existeFormation.setMention(formation.getMention());
         existeFormation.setNumero(formation.getNumero());
         existeFormation.setNiveau(formation.getNiveau());
         existeFormation.setSpecialite(formation.getSpecialite());
         existeFormation.setDepartements(formation.getDepartements());
         return formationRepository.save(formation);
      }
      return null;
   }

   public void supprimer_Formation(Long id) {
      formationRepository.deleteById(id);
   }

   /* public List<Formation> listerFormationParDomaine(Long domaine) {
      return formationRepository.findByDomaine(domaine);
   }
 */
   public List<Formation> listerFormationParAnneeScolaire(Long anneeScolaire) {
      return formationRepository.findByAnneeScolaire(anneeScolaire);
   }

   public List<Formation> listerFormationParUfr(Long ufr) {
      return formationRepository.findByUfrFormation(ufr);
   }

}
