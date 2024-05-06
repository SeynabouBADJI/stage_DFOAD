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

import com.dfoad.GestionDesCoursHybrides.modele.Departement;
import com.dfoad.GestionDesCoursHybrides.modele.Formation;
import com.dfoad.GestionDesCoursHybrides.modele.Ufr;
import com.dfoad.GestionDesCoursHybrides.service.UfrService;

@RestController
@RequestMapping("/dfoad/ufrs")

public class UfrRestcontoller {

    @Autowired

    private UfrService ufrService;

    @GetMapping(path = "/")
    public List<Ufr> lister_ufr() {
        return ufrService.lister_Ufr();

    }

    @GetMapping(path = "/ufr/{id}")
    public Optional<Ufr> lister_unufr(@PathVariable Long id) {
        return ufrService.lister_UnUfr(id);

    }

    @GetMapping(path = "/{id}")
    public Ufr rechercher_ufr(@PathVariable Long id) {
        return ufrService.rechercher_Ufr(id);
    }

    @PostMapping(path = "/")
    public Ufr ajouter_ufr(@RequestBody Ufr ufr) {
        return ufrService.ajouter_Ufr(ufr);
    }

    @PutMapping(path = "/{id}")
    public Ufr modifier_ufr(@RequestBody Ufr ufr, @PathVariable Long id) {
        return ufrService.modifier_Ufr(ufr, id);

    }

    @DeleteMapping(path = "/{id}")
    public void supprimer_ufr(@PathVariable Long id) {
        ufrService.supprimer_Ufr(id);
    }

   


}