package com.kesug.myapplication

import android.graphics.Bitmap
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.compose.ui.tooling.preview.Preview

@Composable
fun BakingScreen(
    bakingViewModel: BakingViewModel = viewModel()
) {
    var prompt by rememberSaveable { mutableStateOf("") }
    val uiState by bakingViewModel.uiState.collectAsState()
    val scrollState = rememberScrollState()

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp)
    ) {

        Text(
            text = "Baking AI",
            style = MaterialTheme.typography.titleLarge,
            modifier = Modifier.padding(bottom = 16.dp)
        )

        TextField(
            value = prompt,
            onValueChange = { prompt = it },
            label = { Text("Prompt") },
            modifier = Modifier
                .fillMaxWidth()
                .padding(bottom = 16.dp)
        )

        Button(
            onClick = {
                val bitmap = Bitmap.createBitmap(1, 1, Bitmap.Config.ARGB_8888)
                bakingViewModel.sendPrompt(bitmap, prompt)
            },
            enabled = prompt.isNotEmpty(),
            modifier = Modifier.align(Alignment.End)
        ) {
            Text("Go")
        }

        Spacer(modifier = Modifier.height(16.dp))

        when (uiState) {
            UiState.Initial -> Text("Enter a prompt above.")
            UiState.Loading -> CircularProgressIndicator(
                modifier = Modifier.align(Alignment.CenterHorizontally)
            )
            is UiState.Success -> Text(
                text = (uiState as UiState.Success).outputText,
                textAlign = TextAlign.Start,
                modifier = Modifier
                    .fillMaxWidth()
                    .verticalScroll(scrollState)
                    .padding(top = 16.dp)
            )
            is UiState.Error -> Text(
                text = (uiState as UiState.Error).errorMessage,
                color = MaterialTheme.colorScheme.error,
                modifier = Modifier
                    .fillMaxWidth()
                    .verticalScroll(scrollState)
                    .padding(top = 16.dp)
            )
        }
    }
}

@Preview(showSystemUi = true)
@Composable
fun BakingScreenPreview() {
    BakingScreen()
}
