package co.com.sofka.questions.controller;

import co.com.sofka.questions.dto.AnswerDTO;
import co.com.sofka.questions.dto.QuestionDTO;
import co.com.sofka.questions.service.AnswerService;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@RestController
public class AnswerController {
    private final AnswerService answerService;

    public AnswerController(AnswerService answerService) {
        this.answerService = answerService;
    }

    @GetMapping("/get/{id}")
    public Mono<QuestionDTO> getQuestion(@PathVariable("id") String id){
        return answerService.getQuestion(id);
    }

    @PostMapping("/add")
    public Mono<QuestionDTO> addAnswer(@RequestBody AnswerDTO answerDTO){
        return answerService.addAnswer(answerDTO);
    }
}
