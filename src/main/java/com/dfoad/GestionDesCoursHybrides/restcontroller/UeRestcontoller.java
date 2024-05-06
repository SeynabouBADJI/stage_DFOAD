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

import com.dfoad.GestionDesCoursHybrides.modele.Ec;
import com.dfoad.GestionDesCoursHybrides.modele.ParcoursUe;
import com.dfoad.GestionDesCoursHybrides.modele.Ue;
import com.dfoad.GestionDesCoursHybrides.service.UeService;

@RestController
@RequestMapping("/dfoad/ues")

public class UeRestcontoller {

    @Autowired

    private UeService ueService;

    @GetMapping(path = "/")
    public List<Ue> lister_ue(){
        return ueService.lister_Ue();
    
    }
    @GetMapping(path = "/ue/{id}")
    public Optional<Ue> lister_unue(@PathVariable Long id){
        return ueService.lister_UnUe(id);
    
    }
    
    @GetMapping(path = "/{id}")
    public Ue rechercher_ue(@PathVariable Long id){
        return ueService.rechercher_Ue(id);
    }


    @PostMapping(path="/")
    public Ue ajouter_ue(@RequestBody Ue ue){
        return  ueService.ajouter_Ue(ue);
    }

    @PutMapping(path = "/{id}")
    public Ue modifier_ue (@RequestBody Ue ue , @PathVariable Long id){
        return  ueService.modifier_Ue(ue, id);

    }

    @DeleteMapping(path = "/{id}")
    public void supprimer_ue(@PathVariable Long id){
        ueService.supprimer_Ue(id);
    }

 

   


    
}