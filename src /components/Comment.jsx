import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function Comment(props) {
  const { customer, content } = props.comment
  const firstName = customer.first_name
  const lastName = customer.last_name
  const commentor = firstName + ' ' + lastName

  return (
    <Box sx={{ mb: 1 }}>
      <Card variant="outlined">
        <CardContent>
          <Typography
            gutterBottom
            sx={{ color: "text.secondary", fontSize: 14 }}
          >
            {commentor}
          </Typography>
          <Typography variant="body2">
            {content}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
