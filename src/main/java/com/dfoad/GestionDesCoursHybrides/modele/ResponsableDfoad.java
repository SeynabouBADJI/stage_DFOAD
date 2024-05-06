package com.dfoad.GestionDesCoursHybrides.modele;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Entity
@Data @NoArgsConstructor @AllArgsConstructor
public class ResponsableDfoad {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
      // Adresse email de l'utilisateur, non nulle et unique
      @Column(nullable = false, unique = true)
      private String pseudo;
  
      // Mot de passe de l'utilisateur, non nul
      @Column(nullable = false)
      private String password;
  
      // Prénom de l'utilisateur
      private String prenom;
  
      // Nom de l'utilisateur
      private String nom;
  
      // Rôle de l'utilisateur, non nul
      @Column(nullable = false)
      private String role;
      
    //   private Date dateCreation;
    //   private Date dateModification;
  
    @JsonIgnore
    @OneToMany(mappedBy = "responsableDfoad")
    private List<Contrat> contrats;
}
