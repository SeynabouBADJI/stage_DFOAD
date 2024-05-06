// package com.dfoad.GestionDesCoursHybrides.service;
// import java.util.List;
// import java.util.Optional;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;
// import com.dfoad.GestionDesCoursHybrides.modele.Superviseur;
// import com.dfoad.GestionDesCoursHybrides.repository.SuperviseurRepository;
// import jakarta.transaction.Transactional;
// @Service
// @Transactional
// public class SuperviseurService {
    

//     @Autowired
//     private SuperviseurRepository superviseurRepository;


   
//    public List<Superviseur> lister_Superviseur(){
//       return superviseurRepository.findAll();
//    }
    
//    public Optional<Superviseur> lister_UnSuperviseur(Long id){
//       return superviseurRepository.findById(id);
//    }

//    public Superviseur rechercher_Superviseur(Long id){
//       return superviseurRepository.findById(id).get();
//    }

//    public Superviseur ajouter_Superviseur(Superviseur superviseur){
//       return superviseurRepository.save(superviseur);
//    }

//    public Superviseur modifier_Superviseur(Superviseur superviseur, Long id){
//       superviseur.setId(id);
//       return superviseurRepository.save(superviseur);
//    }


//    public void supprimer_Superviseur(Long id){
//     superviseurRepository.deleteById(id);
//    }

// }
