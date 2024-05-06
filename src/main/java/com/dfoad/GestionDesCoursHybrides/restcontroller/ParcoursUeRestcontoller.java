package com.dfoad.GestionDesCoursHybrides.restcontroller;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.dfoad.GestionDesCoursHybrides.modele.ParcoursUe;
import com.dfoad.GestionDesCoursHybrides.service.ParcoursUeService;

@RestController
@RequestMapping("/dfoad/parcoursUes")

public class ParcoursUeRestcontoller {

    @Autowired

    private ParcoursUeService parcoursUeService;

    @GetMapping(path = "/")
    public List<ParcoursUe> lister_parcoursUe(){
        return parcoursUeService.lister_ParcoursUe();
    
    }
    @GetMapping(path = "/parcoursUe/{id}")
    public Optional<ParcoursUe> lister_unparcoursUe(@PathVariable Long id){
        return parcoursUeService.lister_UnParcoursUe(id);
    
    }
    
    @GetMapping(path = "/{id}")
    public ParcoursUe rechercher_parcoursUe(@PathVariable Long id){
        return parcoursUeService.rechercher_ParcoursUe(id);
    }


    @PostMapping(path="/")
    public ParcoursUe ajouter_parcoursUe(@RequestBody ParcoursUe parcoursUe){
        return  parcoursUeService.ajouter_ParcoursUe(parcoursUe);
    }

    @PutMapping(path = "/{id}")
    public ParcoursUe modifier_parcoursUe (@RequestBody ParcoursUe parcoursUe , @PathVariable Long id){
        return  parcoursUeService.modifier_ParcoursUe(parcoursUe, id);

    }

    @DeleteMapping(path = "/{id}")
    public void supprimer_parcoursUe(@PathVariable Long id){
        parcoursUeService.supprimer_ParcoursUe(id);
    }
    @GetMapping("/parcours/{id}")
    public List<ParcoursUe> listerParcoursUeParParcours(@PathVariable Long id) {
          return parcoursUeService.listerParcoursUeParParcours(id);
    }
    @GetMapping("/ue/{id}/parcoursUe")
    public List<ParcoursUe> listerParcoursUeParUe(@PathVariable Long id) {
         return parcoursUeService.listerParcoursUeParUe(id);
    }
}