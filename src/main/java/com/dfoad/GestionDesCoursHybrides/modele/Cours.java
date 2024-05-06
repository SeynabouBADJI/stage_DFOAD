package com.dfoad.GestionDesCoursHybrides.modele;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data @NoArgsConstructor @AllArgsConstructor
public class Cours {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String libelle;
    private Integer volumeHoraire;
    private Boolean estPresentiel;
    private String description;
    @ManyToOne
    private Ec ec;
    @JsonIgnore
    @OneToMany(mappedBy = "cours")
    private List<Enseignant> enseignants;
}
