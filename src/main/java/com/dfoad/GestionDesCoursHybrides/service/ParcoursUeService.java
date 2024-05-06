package com.dfoad.GestionDesCoursHybrides.service;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.dfoad.GestionDesCoursHybrides.modele.ParcoursUe;
import com.dfoad.GestionDesCoursHybrides.repository.ParcoursUeRepository;
import jakarta.transaction.Transactional;

@Service
@Transactional
public class ParcoursUeService {

   @Autowired
   private ParcoursUeRepository parcoursUeRepository;

   public List<ParcoursUe> lister_ParcoursUe() {
      return parcoursUeRepository.findAll();
   }

   public Optional<ParcoursUe> lister_UnParcoursUe(Long id) {
      return parcoursUeRepository.findById(id);
   }

   public ParcoursUe rechercher_ParcoursUe(Long id) {
      return parcoursUeRepository.findById(id).get();
   }

   public ParcoursUe ajouter_ParcoursUe(ParcoursUe parcoursUe) {
      return parcoursUeRepository.save(parcoursUe);
   }

   public ParcoursUe modifier_ParcoursUe(ParcoursUe parcoursUe, Long id) {
      ParcoursUe existParcoursUe = rechercher_ParcoursUe(id);
      if (existParcoursUe != null) {
         existParcoursUe.setCoefficient(parcoursUe.getCoefficient());
         existParcoursUe.setCredit(parcoursUe.getCredit());
         existParcoursUe.setParcours(parcoursUe.getParcours());
         existParcoursUe.setUe(parcoursUe.getUe());
         return parcoursUeRepository.save(parcoursUe);
      }
      return null;
   }

   public void supprimer_ParcoursUe(Long id) {
      parcoursUeRepository.deleteById(id);
   }

   public List<ParcoursUe> listerParcoursUeParParcours(Long idparcours) {
      return parcoursUeRepository.findByParcours(idparcours);
   }

   public List<ParcoursUe> listerParcoursUeParUe(Long ue) {
      return parcoursUeRepository.findByParcoursUe(ue);
   }
}
