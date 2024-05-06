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
import com.dfoad.GestionDesCoursHybrides.modele.Contrat;
import com.dfoad.GestionDesCoursHybrides.service.ContratService;

@RestController
@RequestMapping("/dfoad/contrats")

public class ContratRestcontoller {

    @Autowired

    private ContratService contratService;

    @GetMapping(path = "/")
    public List<Contrat> lister_contrat() {
        return contratService.lister_Contrat();

    }

    @GetMapping(path = "/contrat/{id}")
    public Optional<Contrat> lister_uncontrat(@PathVariable Long id) {
        return contratService.lister_UnContrat(id);

    }

    @GetMapping(path = "/{id}")
    public Contrat rechercher_contrat(@PathVariable Long id) {
        return contratService.rechercher_Contrat(id);
    }

    @PostMapping(path = "/")
    public Contrat ajouter_contrat(@RequestBody Contrat contrat) {
        return contratService.ajouter_Contrat(contrat);
    }

    @PutMapping(path = "/{id}")
    public Contrat modifier_contrat(@RequestBody Contrat contrat, @PathVariable Long id) {
        return contratService.modifier_Contrat(contrat, id);

    }

    @DeleteMapping(path = "/{id}")
    public void supprimer_contrat(@PathVariable Long id) {
        contratService.supprimer_Contrat(id);
    }

    @GetMapping("/enseignant/{id}")
    public List<Contrat> listerContratParEnseignant(@PathVariable Long id) {
        return contratService.listerContratParEnseignant(id);
    }
    @GetMapping("/responsable/{id}")
    public List<Contrat> listerContratParResponsableDfoad(@PathVariable Long id) {
          return contratService.listerContratParResponsableDfoad(id);
    }

}