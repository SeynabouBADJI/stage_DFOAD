package com.dfoad.GestionDesCoursHybrides.service;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.dfoad.GestionDesCoursHybrides.modele.Niveau;
import com.dfoad.GestionDesCoursHybrides.repository.NiveauRepository;
import jakarta.transaction.Transactional;
@Service
@Transactional
public class NiveauService {
    

    @Autowired
    private NiveauRepository niveauRepository;


   
   public List<Niveau> lister_Niveau(){
      return niveauRepository.findAll();
   }
    
   public Optional<Niveau> lister_UnNiveau(Long id){
      return niveauRepository.findById(id);
   }

   public Niveau rechercher_Niveau(Long id){
      return niveauRepository.findById(id).get();
   }

   public Niveau ajouter_Niveau(Niveau niveau){
      return niveauRepository.save(niveau);
   }

   public Niveau modifier_Niveau(Niveau niveau, Long id){
      Niveau existNiveau = rechercher_Niveau(id);
      if (existNiveau != null) {
         existNiveau.setFormation(niveau.getFormation());
         existNiveau.setNumero(niveau.getNumero());
         existNiveau.setSemestre(niveau.getSemestre());
         return niveauRepository.save(niveau);   
      }
      return null;
   }


   public void supprimer_Niveau(Long id){
    niveauRepository.deleteById(id);
   }
   public List<Niveau> listerNiveauParSemestre(Long id) {
      return niveauRepository.findBySemestreNiveau(id);
   }
   public List<Niveau> listerNiveauParFormation(Long formation) {
      return niveauRepository.findByFormation(formation);
   }

}
