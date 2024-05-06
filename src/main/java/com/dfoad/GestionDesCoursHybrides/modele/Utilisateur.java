package com.dfoad.GestionDesCoursHybrides.modele;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Cette classe représente un utilisateur dans le système.
 * Elle est annotée avec @Entity pour indiquer qu'elle est une entité
 * persistante.
 * Elle utilise Lombok pour générer automatiquement les méthodes getters,
 * setters, etc.
 * 
 * Un utilisateur peut être associé à plusieurs déploiements.
 * 
 * Les attributs de l'utilisateur comprennent son mail, son mot de passe, son
 * prénom, son nom, son rôle, etc.
 * 
 * Elle utilise les annotations JPA pour mapper cette classe à une table de base
 * de données relationnelle.
 * L'annotation @JsonIgnore est utilisée pour exclure les déploiements lors de
 * la sérialisation JSON.
 * 
 * L'attribut "mail" est annoté avec @Column pour spécifier des contraintes de
 * base de données (non null et unique).
 * 
 * @author 
 */
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Utilisateur {
    // Identifiant unique de l'utilisateur, généré automatiquement
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Adresse email de l'utilisateur, non nulle et unique
    @Column(nullable = false, unique = true)
    private String mail;

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

    // Liste des déploiements associés à cet utilisateur, ignorée lors de la
    // sérialisation JSON
    // @JsonIgnore
    // @OneToMany(mappedBy = "utilisateur")
    // private List<Deploiement> deploiements;
}
