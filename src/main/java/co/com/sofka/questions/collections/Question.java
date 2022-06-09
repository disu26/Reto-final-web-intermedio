package co.com.sofka.questions.collections;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "questions")
public class Question {
    @Id
    private String id;
    private String userId;
    private String question;
    private String type;
    private String category;
}
