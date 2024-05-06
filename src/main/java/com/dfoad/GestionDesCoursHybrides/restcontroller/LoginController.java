package com.dfoad.GestionDesCoursHybrides.restcontroller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.dfoad.GestionDesCoursHybrides.modele.AccountCredentials;
import com.dfoad.GestionDesCoursHybrides.modele.ResponsableDfoad;
import com.dfoad.GestionDesCoursHybrides.service.JwtService;
import com.dfoad.GestionDesCoursHybrides.service.ResponsableDfoadService;


/**
 * Ce contrôleur gère les requêtes liées à l'authentification et la génération
 * de jetons JWT.
 * Il utilise JwtService pour générer les jetons JWT et ResponsableDfoadService pour
 * obtenir les informations de l'utilisateur.
 * 
 * Il est annoté avec @RestController pour indiquer qu'il traite les requêtes
 * REST.
 * 
 * La méthode getToken() gère les requêtes POST sur l'endpoint "/login" pour
 * obtenir un jeton JWT après l'authentification de l'utilisateur.
 * 
 * @author Seydina Mouhamadou Al Hamine NDIAYE
 */
@RestController
public class LoginController {
	@Autowired
	private JwtService jwtService;
	@Autowired
	ResponsableDfoadService uService;
	@Autowired
	AuthenticationManager authenticationManager;

	/**
	 * Gère les requêtes POST sur l'endpoint "/login" pour obtenir un jeton JWT
	 * après l'authentification de l'utilisateur.
	 * 
	 * @param credentials Les informations d'identification de l'utilisateur (nom
	 *                    d'utilisateur et mot de passe).
	 * @return Une réponse HTTP contenant le jeton JWT généré et d'autres
	 *         informations utilisateur.
	 */
	@PostMapping("/login")
	public ResponseEntity<?> getToken(@RequestBody AccountCredentials credentials) {
		// Crée un objet UsernamePasswordAuthenticationToken avec les informations
		// d'identification de l'utilisateur
		UsernamePasswordAuthenticationToken creds = new UsernamePasswordAuthenticationToken(
				credentials.getUsername(),
				credentials.getPassword());

		// Authentifie l'utilisateur avec l'AuthenticationManager
		Authentication auth = authenticationManager.authenticate(creds);

		// Récupère l'utilisateur authentifié
		ResponsableDfoad user = uService.findByUsername(auth.getName());
		// Récupère le rôle de l'utilisateur
		String role = user.getRole();
		// Récupère l'ID de l'utilisateur
		Long userId = user.getId();

		// Génère un jeton JWT avec le nom d'utilisateur et le rôle
		String jwts = jwtService.getToken(auth.getName(), role);

		// Crée une map pour contenir le jeton JWT et d'autres informations utilisateur
		Map<String, Object> response = new HashMap<>();
		response.put("token", "Bearer " + jwts); // Ajoute le jeton JWT
		response.put("userId", userId); // Ajoute l'ID de l'utilisateur
		response.put("prenom", user.getPrenom()); // Ajoute le prénom de l'utilisateur
		response.put("nom", user.getNom()); // Ajoute le nom de l'utilisateur

		// Ajoute les en-têtes HTTP
		HttpHeaders headers = new HttpHeaders();
		headers.add(HttpHeaders.AUTHORIZATION, "Bearer " + jwts); // Ajoute le jeton JWT dans les en-têtes
		headers.add(HttpHeaders.ACCESS_CONTROL_EXPOSE_HEADERS, "Authorization"); // Expose le jeton JWT dans les
																					// en-têtes

		// Renvoie une réponse HTTP contenant le jeton JWT et d'autres informations
		// utilisateur
		return ResponseEntity.ok()
				.headers(headers)
				.body(response);
	}
}
