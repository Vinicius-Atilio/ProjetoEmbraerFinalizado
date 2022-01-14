package embraer.prova.rest.api.controller;

import embraer.prova.rest.api.model.AviaoModel;
import embraer.prova.rest.api.repository.AviaoRepository;

import java.net.URI;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

@RestController
@CrossOrigin(origins="*")
@RequestMapping("/aeronaves")
public class AviaoController {

    @Autowired
    private AviaoRepository aviaoRepository;
    
    @RequestMapping
    public List<AviaoModel> listaAvioes() {
		List<AviaoModel> aeronaves = aviaoRepository.findAll();
		return aeronaves;
	} 
    
    @GetMapping(path = "/find/{nome}")
    public List<AviaoModel> detalhes(@PathVariable("nome") String nomeAviao) {
		List<AviaoModel> aeronaves = aviaoRepository.findByNomeContaining(nomeAviao);
		try{
			long idAviao = Long.parseLong(nomeAviao);
			Optional<AviaoModel> optionalAviao =  aviaoRepository.findById(idAviao);
			if (optionalAviao.isPresent()) {
				AviaoModel aviao = optionalAviao.get();
				boolean aviaoEstaNaLista = aeronaves.stream().anyMatch((aviaoStream) -> aviaoStream.getNome() == aviao.getNome());
				if(!aviaoEstaNaLista) {
					aeronaves.add(optionalAviao.get());
				}			
			}
		}catch(Exception e) {
			e.printStackTrace();
		}
		
		return aeronaves;
    }
    

    @GetMapping(path = "/{Id}")
    public ResponseEntity<AviaoModel> detalhes(@PathVariable("Id") Long Id) {
        Optional<AviaoModel> aviao =  aviaoRepository.findById(Id);
                if (aviao.isPresent()) {
                	return ResponseEntity.ok(aviao.get());
                }
                return ResponseEntity.notFound().build();
    }

    
	@PostMapping
	@Transactional
	public ResponseEntity<AviaoModel> cadastrar(@RequestBody AviaoModel aviao, UriComponentsBuilder uriBuilder) {
		aviaoRepository.save(aviao);
		URI uri = uriBuilder.path("/topicos/{id}").buildAndExpand(aviao.getId()).toUri();
		return ResponseEntity.created(uri).body(aviao);
	}
	
	
	@PutMapping("/{id}")
	@Transactional
	public ResponseEntity<AviaoModel> atualizar(@PathVariable Long id, @RequestBody AviaoModel aviaoRequest) {
		Optional<AviaoModel> optional = aviaoRepository.findById(id);
		if (optional.isPresent()) {
			AviaoModel aviao = aviaoRepository.save(aviaoRequest);
			return ResponseEntity.ok(aviao);
		}
		
		return ResponseEntity.notFound().build();
		}

	
	@DeleteMapping("/{id}")
	@Transactional
	public ResponseEntity<?> remover(@PathVariable Long id) {
		Optional<AviaoModel> optional = aviaoRepository.findById(id);
		if (optional.isPresent()) {
			aviaoRepository.deleteById(id);
			return ResponseEntity.ok().build();
		}
		
		return ResponseEntity.notFound().build();
	}
	
	
	}
	
	