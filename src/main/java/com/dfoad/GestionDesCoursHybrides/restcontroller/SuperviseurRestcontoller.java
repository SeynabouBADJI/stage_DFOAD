// package com.dfoad.GestionDesCoursHybrides.restcontroller;
// import java.util.List;
// import java.util.Optional;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.web.bind.annotation.DeleteMapping;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.PathVariable;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.PutMapping;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RestController;
// import com.dfoad.GestionDesCoursHybrides.modele.Superviseur;
// import com.dfoad.GestionDesCoursHybrides.service.SuperviseurService;

// @RestController
// @RequestMapping("/dfoad/superviseurs")

// public class SuperviseurRestcontoller {

//     @Autowired

//     private SuperviseurService superviseurService;

//     @GetMapping(path = "/")
//     public List<Superviseur> lister_superviseur(){
//         return superviseurService.lister_Superviseur();
    
//     }
//     @GetMapping(path = "/superviseur/{id}")
//     public Optional<Superviseur> lister_unsuperviseur(@PathVariable Long id){
//         return superviseurService.lister_UnSuperviseur(id);
    
//     }
    
//     @GetMapping(path = "/{id}")
//     public Superviseur rechercher_superviseur(@PathVariable Long id){
//         return superviseurService.rechercher_Superviseur(id);
//     }


//     @PostMapping(path="/")
//     public Superviseur ajouter_superviseur(@RequestBody Superviseur superviseur){
//         return  superviseurService.ajouter_Superviseur(superviseur);
//     }

//     @PutMapping(path = "/{id}")
//     public Superviseur modifier_superviseur (@RequestBody Superviseur superviseur , @PathVariable Long id){
//         return  superviseurService.modifier_Superviseur(superviseur, id);

//     }

//     @DeleteMapping(path = "/{id}")
//     public void supprimer_superviseur(@PathVariable Long id){
//         superviseurService.supprimer_Superviseur(id);
//     }
// }