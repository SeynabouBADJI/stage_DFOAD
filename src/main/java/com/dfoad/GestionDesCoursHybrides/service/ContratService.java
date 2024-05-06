package com.dfoad.GestionDesCoursHybrides.service;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.dfoad.GestionDesCoursHybrides.modele.Contrat;
import com.dfoad.GestionDesCoursHybrides.repository.ContratRepository;
import jakarta.transaction.Transactional;
@Service
@Transactional
public class ContratService {
    

    @Autowired
    private ContratRepository contratRepository;


   
   public List<Contrat> lister_Contrat(){
      return contratRepository.findAll();
   }
    
   public Optional<Contrat> lister_UnContrat(Long id){
      return contratRepository.findById(id);
   }

   public Contrat rechercher_Contrat(Long id){
      return contratRepository.findById(id).get();
   }

   public Contrat ajouter_Contrat(Contrat contrat){
      return contratRepository.save(contrat);
   }

   public Contrat modifier_Contrat(Contrat contrat, Long id){
      Contrat existeContrat = rechercher_Contrat(id);
      if ( existeContrat != null) {
         existeContrat.setDateCommencement(contrat.getDateCommencement());
         existeContrat.setDateStage(contrat.getDateStage());
         existeContrat.setDuree(contrat.getDuree());
         existeContrat.setSignatureEnseignant(contrat.getSignatureEnseignant());
         existeContrat.setSignatureResponsable(contrat.getSignatureResponsable());
         existeContrat.setEnseignant(contrat.getEnseignant());
         existeContrat.setResponsableDfoad(contrat.getResponsableDfoad());
         return contratRepository.save(contrat);
         
      }
      return null;
   }


   public void supprimer_Contrat(Long id){
    contratRepository.deleteById(id);
   }

   public List<Contrat> listerContratParEnseignant(Long enseignant) {
      return contratRepository.findByEnseignant(enseignant);
  }
  public List<Contrat> listerContratParResponsableDfoad(Long responsableDfoad) {
   return contratRepository.findByResponsableDfoad(responsableDfoad);
}



}
